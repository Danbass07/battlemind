export const hypeLevelHandler = (e, typeId, user, activeGroupIndex) => {
    user.groups[activeGroupIndex].users
        .filter(user => user.id === user.id)[0]
        .types.filter(type => type.id === typeId)[0].pivot.hype =
        e.target.value;

    axios.post(`/hype/hypenotizerrr`, {
        typeId: typeId,
        value: e.target.value
    });
};
