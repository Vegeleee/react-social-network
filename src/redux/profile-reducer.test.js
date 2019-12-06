import profileReducer, { addPost } from "./profile-reducer";

const state = {
	posts: [
		{id: 1, message: 'Hi', likesCount: 12},
		{id: 2, message: 'How are you', likesCount: 11},
	]
};

it('Length of posts should be incremented', () => {
	const action = addPost('Bla-bla-bla')

	const newState = profileReducer(state, action);

	expect(newState.posts.length).toBe(3);
});

it('Message of new post should be correct', () => {
	const action = addPost('Bla-bla-bla')

	const newState = profileReducer(state, action);

	expect(newState.posts[2].message).toBe("Bla-bla-bla");
});

it('Count of likes should be equal 0', () => {
	const action = addPost('Bla-bla-bla')

	const newState = profileReducer(state, action);

	expect(newState.posts[2].likesCount).toBe(0);
});