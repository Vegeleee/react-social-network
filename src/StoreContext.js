import React from 'react';

export const Provider = (props) => {
	return (
		<StoreContext.Provider value={props.store}>
			{props.children}
		</StoreContext.Provider>
	);
};

const StoreContext = React.createContext(null);

export default StoreContext;