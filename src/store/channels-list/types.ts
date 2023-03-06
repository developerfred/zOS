import { Channel, User } from '../channels';

export interface Payload {
  channelId: string;
}

export enum ChannelType {
  Channel,
  DirectMessage,
}

export interface DirectMessage extends Channel {
  otherMembers: User[];
}

export interface CreateMessengerConversation {
  userIds: string[];
}