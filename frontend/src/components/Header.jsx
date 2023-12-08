import logo from '/noun-check.png'
import "./header.css"

export const Header = () => {
    return(
        <div className="header-container">
            <div className="logo-container">
                <img className="the-logo" src={logo} alt="logo for the Task app" />
            </div>
            <h1 className="the-header">The task app</h1>
            <h2 className="the-subheader">Complete tasks stylishly</h2>
        </div>
    )
}