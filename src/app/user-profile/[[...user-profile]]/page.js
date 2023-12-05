"use client";
 
import { UserProfile } from "@clerk/nextjs";
import {EditIcon} from '@chakra-ui/icons'
import UpdateInfo from '../../components/updateinfo/UpdateInfo'
 
const UserProfilePage = () => (
  <UserProfile path="/user-profile" routing="path">
    <UserProfile.Link label="Edit Info" url="/" labelIcon={<EditIcon/>} />

    <UserProfile.Page label="Custom Page" labelIcon={<EditIcon/>} url="custom-page">
        <UpdateInfo />
    </UserProfile.Page>
  </UserProfile>
);
 
export default UserProfilePage;