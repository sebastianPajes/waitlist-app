const awsconfig = {
    Auth: {
        region: `${process.env.REACT_APP_REGION}`, 
        userPoolId: `${process.env.REACT_APP_USER_POOL_ID}`, 
        userPoolWebClientId: `${process.env.REACT_APP_USER_POOL_CLIENT}`, 
    }
}

export default awsconfig;