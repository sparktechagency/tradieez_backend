

const compareDate = (endDate: Date) => {
    console.log(endDate);
    const currentDateStr = new Date().toISOString().split("T")[0];
    const currentDate = new Date(currentDateStr as string);
    if(endDate >= currentDate){
        return "active"
    }
    else{
        return "expired"
    }
}

export default compareDate;