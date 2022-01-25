import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("films.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS films (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, year TEXT NOT NULL,type TEXT NOT NULL, posterUri TEXT NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

interface Film {}

export const addToFavorites = (title, posterUri, year, type, id) => {
  const primary = id.slice(2);
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO films (id, title,year,type,posterUri) VALUES (?,?,?,?,?)`,
        [Number(primary), title, year, type, posterUri],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const removeFromFavorites = (id: string) => {
  const primary = id.slice(2);
  console.log(id, primary);
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM films WHERE id=${Number(primary)};`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
export const fetchFavorites = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM films",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
