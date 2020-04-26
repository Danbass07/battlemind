export const compareValues = (key, ascending = false) => {
    return function(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }
        const varA =
            typeof a[key] === "string" /// letter case insensitive
                ? a[key].toUpperCase()
                : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return ascending == false ? comparison * -1 : comparison;
    };
};
export const setUpVote = (votingList, groupId) => {
    const activeVoteDetails = votingList.map(type => {
        return (type = {
            id: type.id,
            name: type.type,
            votersId: [],
            winner: false
        });
    });
    axios.post(
        "/vote/setUpVote",
        {
            data: JSON.stringify(activeVoteDetails),
            group_id: groupId
        },
        console.log(votingList)
    );
};
