import cookie from 'cookie'

export default ( req, res ) => {

    res.setHeader( "Set-Cookie", cookie.serialize("token", null, {
        httpOnly : true,
        secure: process.env.NODE_ENV !== "development",
        // expires: new Date(0),
        maxAge:-1,
        sameSite: "strict",
        path: "/"
    } ) )
    res.statusCode = 200
    res.json( { success: true } )
}