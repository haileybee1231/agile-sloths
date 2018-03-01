const FollowersList = (props) => (
	<List>
	{data.users.map(user => (
		<List.Item> {user.name} </List.Item>
		))}
	</List>
);

export default FollowersList;