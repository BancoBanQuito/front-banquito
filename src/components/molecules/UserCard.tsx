import React from 'react'
import './../../styles/UserCard.css'
import imagen from './../../assets/fotocvNew.png'

interface UserCardProps {
    name: string
    accountNumber: string
    saldo: number
    accountType: string
}


const UserCard: React.FC<UserCardProps> = ({ name, accountNumber, saldo, accountType }) => {
    return (
        <div className='content-user-card'>
            <div className="card">
                <div className="imgBx">
                    <img src={imagen} alt=""></img>
                </div>
                <div className="content">
                    <div className="details">
                        <h2>{name}<br></br> <span>{accountNumber}</span>
                        </h2>
                        <div className="data">
                            <h3>342<br></br><span>Posts</span></h3>
                            <h3>2.4M<br></br><span>Followers</span></h3>
                            <h3>605<br></br><span>Following</span></h3>
                        </div>
                        <div className="actionBtn">
                            <button>Follow</button>
                            <button>Message</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default UserCard

