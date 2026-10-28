import React, { useState } from 'react';
import {
  BellOffIcon,
  BlockIcon,
  ShareIcon,
  TrashIcon,
} from './icons';
import ProfileBody from './profileBody';
import { SheetAction, SuccessModal, BottomSheet } from './parts';

const FriendScreen = ({ navigation, route }) => {
  const user = route.params?.user;
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  const [muted, setMuted] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <>
      <ProfileBody
        user={user}
        navigation={navigation}
        onMenu={() => setMenu(true)}
        onAdd={() => setSent(true)}
        added={
          <SuccessModal
            visible={sent}
            title="Հրավերն ուղարկվել է"
            message={`Կստանաք ծանուցում, երբ ${user.name}ը ընդունի ձեր հրավերը`}
            onClose={() => setSent(false)}
          />
        }
      />
      <BottomSheet visible={menu} onClose={() => setMenu(false)}>
        <SheetAction icon={<ShareIcon />} label="Կիսվել" onPress={() => setMenu(false)} />
        <SheetAction
          icon={<BellOffIcon />}
          label={muted ? 'Միացնել ծանուցումները' : 'Անջատել ծանուցումները'}
          onPress={() => {
            setMuted(v => !v);
            setMenu(false);
          }}
        />
        <SheetAction icon={<BlockIcon />} label="Բլոկավորել" onPress={() => setMenu(false)} />
        <SheetAction
          icon={<TrashIcon />}
          label="Ջնջել"
          danger
          onPress={() => setMenu(false)}
        />
      </BottomSheet>
    </>
  );
};

export default FriendScreen;
