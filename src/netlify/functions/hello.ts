

export const Tester = async(event:any,context:any)=>{
    const data = {hello:"test123"}
    return{
        statusCode:200,
        body: JSON.stringify(data)
    }
}