const handleInputChange = (field, value, data, setData) => {
    setData({...data, [field]: value})
}

const selectItem = (value, key, data, setData) => {
    setData({...data, [key]: value})  
}

const generateSubtitle = (item, translate) => {
    return 'oi'
}

const getTitle = (action_type) => {
    switch(action_type) {
        case "1":
        return "sleep";

        case "2":
        return "eat";

        case "3":
        return "diaper";

        default:
        return "eat";
    }
}

const validateDiaper = (data) => {
    return []
}

const validateSleep = (data) => {
    return []
}

const validateEat = (data) => {
    return []
}

const validateFields = (data, actionType) => {
    switch(actionType) {
        case "1":
        return validateSleep(data);

        case "2":
        return validateEat(data);

        case "3":
        return validateDiaper(data);

        default:
        return validateEat(data);
    }
}

const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const formattedDate = new Intl.DateTimeFormat('pt-BR', options).format(date);

    const [day, month, year, hour, minute, second] = formattedDate.split(/[/ :]/);
    return `${day}/${month}/${year} ${hour}:${minute}`;
};

export {
    handleInputChange,
    generateSubtitle,
    getTitle,
    selectItem,
    validateFields,
    formatDateTime
}