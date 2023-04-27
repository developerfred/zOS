import * as React from 'react';
import { RootState } from '../../store/reducer';
import { InviteDialog } from '.';
import { connectContainer } from '../../store/redux-container';
import { fetchInvite } from '../../store/create-invitation';
import { config } from '../../config';

export interface PublicProperties {
  onClose?: () => void;
}

export interface Properties extends PublicProperties {
  inviteCode: string;
  inviteUrl: string;
  assetPath: string;

  fetchInvite: () => void;
}

export class Container extends React.Component<Properties> {
  static mapState(state: RootState): Partial<Properties> {
    const { createInvitation } = state;

    return {
      inviteCode: createInvitation.code,
      inviteUrl: createInvitation.url,
      assetPath: config.assetsPath,
    };
  }

  static mapActions(_props: Properties): Partial<Properties> {
    return { fetchInvite };
  }

  componentDidMount() {
    this.props.fetchInvite();
  }

  render() {
    return (
      <InviteDialog
        inviteCode={this.props.inviteCode}
        inviteUrl={this.props.inviteUrl}
        assetsPath={this.props.assetPath}
        onClose={this.props.onClose}
      />
    );
  }
}

export const InviteDialogContainer = connectContainer<PublicProperties>(Container);