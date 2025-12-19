import { database } from "./firebase";
import {
  ref,
  get,
  set,
  remove,
  query,
  limitToFirst,
  startAt,
  orderByKey,
  orderByChild,
} from "firebase/database";

export const getNannies = async (limit = 3, lastKey = null) => {
  const nanniesRef = ref(database, "nannies");
  let nanniesQuery;

  if (lastKey) {
    nanniesQuery = query(
      nanniesRef,
      orderByKey(),
      startAt(lastKey),
      limitToFirst(limit + 1)
    );
  } else {
    nanniesQuery = query(nanniesRef, orderByKey(), limitToFirst(limit + 1));
  }

  const snapshot = await get(nanniesQuery);
  const nannies = [];
  snapshot.forEach((child) => {
    nannies.push({ id: child.key, ...child.val() });
  });

  const hasMore = nannies.length > limit;
  if (hasMore) {
    nannies.pop();
  }

  return { nannies, lastKey: hasMore ? nannies[nannies.length - 1].id : null };
};

export const getAllNannies = async () => {
  const nanniesRef = ref(database, "nannies");
  const snapshot = await get(nanniesRef);
  const nannies = [];
  snapshot.forEach((child) => {
    nannies.push({ id: child.key, ...child.val() });
  });
  return nannies;
};

export const addToFavorites = async (userId, nannyId) => {
  const favoritesRef = ref(database, `users/${userId}/favorites/${nannyId}`);
  await set(favoritesRef, true);
};

export const removeFromFavorites = async (userId, nannyId) => {
  const favoritesRef = ref(database, `users/${userId}/favorites/${nannyId}`);
  await remove(favoritesRef);
};

export const getFavorites = async (userId) => {
  const favoritesRef = ref(database, `users/${userId}/favorites`);
  const snapshot = await get(favoritesRef);
  if (!snapshot.exists()) return [];

  const favoriteIds = Object.keys(snapshot.val());
  const nanniesRef = ref(database, "nannies");
  const nannies = [];

  for (const nannyId of favoriteIds) {
    const nannySnapshot = await get(ref(nanniesRef, nannyId));
    if (nannySnapshot.exists()) {
      nannies.push({ id: nannyId, ...nannySnapshot.val() });
    }
  }

  return nannies;
};

export const checkFavorite = async (userId, nannyId) => {
  const favoriteRef = ref(database, `users/${userId}/favorites/${nannyId}`);
  const snapshot = await get(favoriteRef);
  return snapshot.exists();
};
