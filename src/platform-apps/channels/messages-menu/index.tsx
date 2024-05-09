import React, { createRef } from 'react';
import { createPortal } from 'react-dom';

import { DropdownMenu, Modal, IconButton } from '@zero-tech/zui/components';
import { Button, Variant as ButtonVariant, Color as ButtonColor } from '@zero-tech/zui/components/Button';
import { IconDotsHorizontal, IconEdit5, IconFlipBackward, IconTrash4, IconXClose } from '@zero-tech/zui/icons';

import classNames from 'classnames';
import './styles.scss';

export interface Properties {
  className: string;
  canEdit: boolean;
  canDelete: boolean;
  canReply?: boolean;
  isMediaMessage?: boolean;
  isMenuOpen?: boolean;
  isMenuFlying?: boolean;

  onOpenChange?: (isOpen: boolean) => void;
  onCloseMenu?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onReply?: () => void;
}

export interface State {
  deleteDialogIsOpen: boolean;
}

export class MessageMenu extends React.Component<Properties, State> {
  ref = createRef();

  state = { deleteDialogIsOpen: false };

  renderMenuOption(icon, label) {
    return (
      <div className={'option'}>
        {icon} {label}
      </div>
    );
  }

  handleDelayedAction = (action) => {
    setTimeout(() => {
      if (action) {
        action();
      }
    }, 1);
  };

  // Our zUI DropdownMenu component actively steals focus.
  // In order to allow actions to change focus without the dropdown menu stealing it back,
  // we delay publishing the event by releasing the thread for a single tick.
  onEdit = () => {
    this.handleDelayedAction(this.props.onEdit);
  };
  onReply = () => {
    this.handleDelayedAction(this.props.onReply);
  };

  renderItems = () => {
    const menuItems = [];
    if (this.props.onEdit && this.props.canEdit && !this.props.isMediaMessage) {
      menuItems.push({
        id: 'edit',
        label: this.renderMenuOption(<IconEdit5 size={20} />, 'Edit'),
        onSelect: this.onEdit,
      });
    }
    if (this.props.onReply && this.props.canReply && !this.props.isMediaMessage) {
      menuItems.push({
        id: 'reply',
        label: this.renderMenuOption(<IconFlipBackward size={20} />, 'Reply'),
        onSelect: this.onReply,
      });
    }
    if (this.props.onDelete && this.props.canDelete) {
      menuItems.push({
        id: 'delete',
        label: this.renderMenuOption(<IconTrash4 size={20} />, 'Delete'),
        onSelect: this.toggleDeleteDialog,
      });
    }

    return menuItems;
  };

  handleDeleteMessage = () => {
    this.setState({ deleteDialogIsOpen: false }, () => {
      this.props.onDelete();
    });
  };
  toggleDeleteDialog = () => {
    const willOpen = !this.state.deleteDialogIsOpen;
    this.setState({ deleteDialogIsOpen: willOpen });

    if (willOpen && this.props.isMenuOpen) {
      this.props.onOpenChange(false);
    }
  };

  get showDeleteModal(): boolean {
    return this.state.deleteDialogIsOpen;
  }

  renderDeleteModal() {
    return (
      <Modal className='delete-message-modal' open={this.showDeleteModal} onOpenChange={this.toggleDeleteDialog}>
        <div className='delete-message-modal__header'>
          <h2>Delete message</h2>
          <IconButton Icon={IconXClose} size='large' onClick={this.toggleDeleteDialog} />
        </div>
        <div className='delete-message-text-content'>
          Are you sure you want to delete this message? This cannot be undone.
        </div>
        <div className='delete-message-modal__footer'>
          <Button variant={ButtonVariant.Secondary} color={ButtonColor.Greyscale} onPress={this.toggleDeleteDialog}>
            Cancel
          </Button>

          <Button color={ButtonColor.Red} onPress={this.handleDeleteMessage}>
            Delete message
          </Button>
        </div>
      </Modal>
    );
  }

  render() {
    const menuItems = this.renderItems();

    if (!menuItems.length) {
      return null;
    }

    return (
      <div className={this.props.className}>
        {this.props.isMenuOpen &&
          createPortal(<div className='dropdown-menu__underlay' onClick={this.props.onCloseMenu} />, document.body)}
        {!this.state.deleteDialogIsOpen && (
          <DropdownMenu
            menuClassName={'dropdown-menu'}
            items={menuItems}
            side='bottom'
            alignMenu='center'
            onOpenChange={this.props.onOpenChange}
            open={this.props.isMenuOpen}
            showArrow
            trigger={
              <div
                className={classNames('dropdown-menu-trigger', {
                  'dropdown-menu-trigger--open': this.props.isMenuOpen,
                  'dropdown-menu-trigger--flying': this.props.isMenuFlying,
                })}
              >
                <IconDotsHorizontal size={24} isFilled />
              </div>
            }
          />
        )}
        {this.renderDeleteModal()}
      </div>
    );
  }
}
