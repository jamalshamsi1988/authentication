import { verify } from "jsonwebtoken";


const Dashbord = () => {
  return (
    <div>
      Dashbord
    </div>
  )
}

export default Dashbord

export async function getServerSideProps(context){

  const {token} = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;

  const result = verify(token , secretKey);
  if(!result){
    return {
      redirect : {destination : "/signin" , permanent : false}
    }
  }

  return {
    props :{result}
  }
}