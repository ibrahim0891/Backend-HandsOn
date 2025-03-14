import { PrivetEvents } from "../Event/events.model";
import { HelpPost, PrivetPost } from "../Post_CHR/post.model";
import User from "../user/user.model";
import TeamModel from "./team.model"; 
const TeamCreatorService = async (teamData) => {
    try {
        const newTeam = await TeamModel.create(teamData);
        return newTeam;
    } catch (error) {
        throw new Error(error + ": Failed to create team");
    }
};
const teamInvitationCreatorrService = async (invitedUsers , teamId) => {
    try {
        const team = await TeamModel.findById(teamId);
        if (!team) {
            throw new Error("Team not found");
        }
        l;
        team.invitedMembers.push(...invitedUsers);
        invitedUsers.forEach((invitedUser) => {
            //create a notification for the invited user
            //send it to the user
        });
        await team.save();
        return team;
    } catch (error) {
        throw new Error(error + ": Failed to invite users to the team");
    }
};

const teamJoinService = await (teamId  , userId) => {
  const team = await TeamModel.findById(teamId);
  if(!team){
        throw new Error("Team not found");
        return
    }
    if (team.membershipType === "public") {
        team.members.push(userId);
        await team.save();
        return team;
    } else {
        let isUserInvited = team.invitedMembers.includes(userId);
        if (isUserInvited) {
            // Add the user to the members array
            team.members.push(userId);
            // Remove the user from the invitedMembers array
            team.invitedMembers = team.invitedMembers.filter(
                (invitedUser) => invitedUser.toString() !== userId
            );
            await team.save();
            return team;
        }
    }
}

const deleteInvitationService = async (teamId, userId) => {
    try {
        const team = await TeamModel.findById(teamId);
        if (!team) {
            throw new Error("Team not found");
        }
        team.invitedMembers = team.invitedMembers.filter(
            (invitedUser) => invitedUser.toString() !== userId
        );
        await team.save();
        return team;
    } catch (error) {
        throw new Error(error + ": Failed to delete invitation");
    }
};
const leaveTeamService = async (teamId, userId) => {
    try {
        const team = await TeamModel.findById(teamId);
        if (!team) {
            throw new Error("Team not found");
        }
        team.members = team.members.filter(
            (member) => member.toString() !== userId
        );
        await team.save();
        return team;
    } catch (error) {
        throw new Error(error + ": Failed to leave the team");
    }
};


export const teamService = {    
    createTeam: TeamCreatorService,
    inviteUsersToTeam: teamInvitationCreatorrService,
    joinTeam: teamJoinService, 
    deleteInvitation: deleteInvitationService,
    leaveTeam: leaveTeamService,
};


