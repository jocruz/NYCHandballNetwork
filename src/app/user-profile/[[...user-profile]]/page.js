"use client";
 
import { UserProfile } from "@clerk/nextjs";
import {EditIcon} from '@chakra-ui/icons'
import UpdateInfo from '../../components/updateinfo/UpdateInfo'
 
const UserProfilePage = () => (
  <UserProfile path="/user-profile" routing="path">
    <UserProfile.Page label="Update Info" labelIcon={<EditIcon/>} url="custom-page">
        <UpdateInfo />
    </UserProfile.Page>
  </UserProfile>
);
 
export default UserProfilePage;