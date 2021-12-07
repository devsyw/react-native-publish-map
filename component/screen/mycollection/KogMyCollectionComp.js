/** 랜덤색상 return */
export const RandomHexColor = () => {
    return '#000000'.replace(/0/g, () => {
        return (~~(Math.random() * 16)).toString(16);
    });
};