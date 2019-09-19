const compare = (item1,item2) =>{
    if(item1.id < item2.id){
      return -1;
    }
    if(item1.id > item2.id){
      return 1;
    }
    return 0;
  }
  const compareDesc = (item2,item1) =>{
    if(item1.id < item2.id){
      return -1;
    }
    if(item1.id > item2.id){
      return 1;
    }
    return 0;
  }

  export { compare, compareDesc };