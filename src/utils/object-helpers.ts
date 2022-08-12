export const updateObjectInArray = <I extends Record<string, any>, ID = number>(
    items: Array<I>,
    itemId: ID,
    objPropName: keyof I,
    newObjProps: Record<string, any>
): Array<I>  => {
    return items.map(item => item[objPropName] === itemId ? {...item, ...newObjProps} : item)
}