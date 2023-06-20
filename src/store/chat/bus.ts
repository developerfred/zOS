import { eventChannel, multicastChannel } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { chat } from '../../lib/chat';

export enum Events {
  MessageReceived = 'chat/message/received',
  MessageUpdated = 'chat/message/updated',
  MessageDeleted = 'chat/message/deleted',
  UnreadCountChanged = 'chat/message/unreadCountChanged',
  ReconnectStart = 'chat/reconnectStart',
  ReconnectStop = 'chat/reconnectStop',
  InvalidToken = 'chat/invalidToken',
  ChannelInvitationReceived = 'chat/channel/invitationReceived',
}

let theBus;
export function* getChatBus() {
  if (!theBus) {
    theBus = yield call(multicastChannel);
  }
  return theBus;
}

export function createChatConnection(userId, chatAccessToken) {
  return eventChannel((emit) => {
    const receiveNewMessage = (channelId, message) =>
      emit({ type: Events.MessageReceived, payload: { channelId, message } });
    const onMessageUpdated = (channelId, message) =>
      emit({ type: Events.MessageUpdated, payload: { channelId, message } });
    const receiveDeleteMessage = (channelId, messageId) =>
      emit({ type: Events.MessageDeleted, payload: { channelId, messageId } });
    const receiveUnreadCount = (channelId, unreadCount) =>
      emit({ type: Events.UnreadCountChanged, payload: { channelId, unreadCount } });
    const reconnectStart = () => emit({ type: Events.ReconnectStart, payload: {} });
    const reconnectStop = () => emit({ type: Events.ReconnectStop, payload: {} });
    const invalidChatAccessToken = () => emit({ type: Events.InvalidToken, payload: {} });
    const onUserReceivedInvitation = (channelId) =>
      emit({ type: Events.ChannelInvitationReceived, payload: { channelId } });

    chat.initChat({
      reconnectStart,
      reconnectStop,
      receiveNewMessage,
      onMessageUpdated,
      receiveDeleteMessage,
      receiveUnreadCount,
      invalidChatAccessToken,
      onUserReceivedInvitation,
    });
    chat.connect(userId, chatAccessToken);

    const unsubscribe = () => {
      chat.disconnect();
    };
    return unsubscribe;
  });
}
