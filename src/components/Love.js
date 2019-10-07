import React from 'react'

export default function Love(props){
    return(
        <div>
            <svg width="117" height="102" viewBox="0 0 117 102" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M88.5141 0.168804C74.1793 -0.36002 61.5687 6.20352 58.3493 20.0033C56.6542 7.08974 44.1138 0.168804 29.7097 0C7.55171 0.632975 -7.4035 22.1133 3.82382 48.7844C13.8225 69.6739 33.2111 85.6441 58.6035 102C83.6422 86.259 102.876 70.2226 113.002 48.7844C123.128 27.3463 113.68 1.09719 88.5141 0.168804Z" fill={props.color}/>
            </svg>
        </div>
    )
}