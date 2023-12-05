"use client";
 
import { UserProfile } from "@clerk/nextjs";
import {EditIcon} from '@chakra-ui/icons'
import TestComp from '../../components/test/TestComp'
 
const UserProfilePage = () => (
  <UserProfile path="/user-profile" routing="path">
    <UserProfile.Link label="Edit Info" url="/" labelIcon={<EditIcon/>} />

    <UserProfile.Page label="Custom Page" labelIcon={<EditIcon/>} url="custom-page">
        <TestComp />
    </UserProfile.Page>
  </UserProfile>
);
 
export default UserProfilePage;