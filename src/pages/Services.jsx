import Base from "../components/Base"
import userContext from "../context/userContext";
const Services=() => {
    return(
        <userContext.Consumer>
            {
                (user)=>(
                    <Base>
                        <h1>This is Services page</h1>
                        <h1>Welcome {user.user.login && user.user.data.user?.name}</h1>
                    </Base>
                )
            }
        </userContext.Consumer>
    )
}
export default Services;