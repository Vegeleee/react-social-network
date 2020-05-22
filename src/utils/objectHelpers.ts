export const updateObjectInArray = (items: any, itemId: any, objPropName: any, newObjectProps: any) => {
	return items.map((item: any) => {
		if (item[objPropName] === itemId) {
			return { ...item, ...newObjectProps }
		}

		return item
	})
}
