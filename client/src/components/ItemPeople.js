import React from 'react';

export const ItemPeople = (props) => {

    return(
            <div className="col s6">
                <h4 className="header">{props.name}</h4>
                <div className="card horizontal">
                    <div className="card-stacked">
                        <div className="card-content">
                            <p>Have experience: {props.experience}</p>
                            <p>On data: {new Date(props.date).toLocaleDateString()} </p>
                        </div>
                    </div>
                </div>
            </div>
    )
};
