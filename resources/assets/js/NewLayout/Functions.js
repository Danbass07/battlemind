export const hypeLevelHandler = (e, typeId, user, activeGroupIndex) => {
    user.groups[activeGroupIndex].users.map(user => {
        if (user.id === user.id) {
            user.types.map(type => {
                if (type.id === typeId) {
                    type.pivot.hype = e.target.value;
                }
            });
        }
    });

    axios.post(`/hype/hypenotizerrr`, {
        typeId: typeId,
        value: e.target.value
    });

    return user;
};
