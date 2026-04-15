
const arr = [1,2,3,4,5];
for (el in arr)
{
    console.log(el);
}

const hy  = arr.some((el) => el>100)
console.log(hy)