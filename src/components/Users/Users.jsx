import React from 'react';

const Users = ({users, follow, unfollow}) => {
	return (
		<div>
			{
				users.map(u =>
					<div key={u.id}>
						<div>
							<div>
								<img />
							</div>
							<div>
								{
									u.followed ?
										<button onClick={() => unfollow(u.id)}>Unfollow</button> :
										<button onClick={() => follow(u.id)}>Follow</button>
								}
							</div>
						</div>
						<div>
							<div>{u.fullName}</div>
							<div>{u.status}</div>
						</div>
						<div>
							<div>{u.location.country}</div>
							<div>{u.location.city}</div>
						</div>
					</div>

				)
			}
		</div>
	);
};

export default Users;