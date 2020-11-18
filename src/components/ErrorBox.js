import React from 'react'

function ErrorBox(props) {
    const { errorText } = props;
    return (
        <div className="errorBox">
            {errorText}
        </div>
    )
}

export default ErrorBox;