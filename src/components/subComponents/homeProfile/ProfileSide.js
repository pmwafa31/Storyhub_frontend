import React from 'react'
import ProfileCard from './ProfileCard'
import FriendsCard from './FriendsCard';

function ProfileSide() {
  return (
    <div>
      <div>
        <ProfileCard/>
      </div>
      <div className='mt-1'>
        <FriendsCard/>
      </div>
    </div>
  )
}

export default ProfileSide