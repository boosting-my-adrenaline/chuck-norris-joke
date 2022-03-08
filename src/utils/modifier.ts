type IWithId = {
  id: number
}

// export function updateItemDetails<IWithId>(
//   item_list: IWithId[],
//   itemToUpdate: IWithId
// ): IWithId[] {
//   const item = item_list.find((item) => item.id === itemToUpdate.id)
//   item_list[item_list.indexOf(item)] = itemToUpdate
//   return item_list
// }

export function addNewItem<Type>(itemList: Type[], itemToAdd: Type): Type[] {
  itemList.push(itemToAdd)
  return itemList
}

// export function deleteItem<IWithId>(
//   itemList: IWithId[],
//   id: number
// ): IWithId[] {
//   return itemList.filter((item) => item.id !== id)
// }

export const newItemId = (itemList: IWithId[]): number => {
  return itemList.reduce((maxId, item) => Math.max(item.id, maxId), -1) + 1
}

// function identity<Type>(arg: Type, arr: Type[]): Type {
//   return arg
// }

// function case1<A, B, C>(a: A, b: B, c: C): A {
//   return a
// }
