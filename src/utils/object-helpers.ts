export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newObjProps: any) => {
    items.map((item: any) => item[objPropName] === itemId ? {...item, ...newObjProps} : item)
}