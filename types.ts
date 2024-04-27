import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersWhithProfiles = Server & {
    members: (Member & {profile: Profile})[];
}