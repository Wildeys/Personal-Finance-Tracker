import React from 'react';
import { observer } from 'mobx-react-lite';

import type { OptionType } from '@/components/ui';
import { Options, useModal } from '@/components/ui';
import { CurrencyIcon } from '@/components/ui/icons';
import { translate } from '@/lib';
import type { TxKeyPath } from '@/lib';
import type { CurrencyCode } from '@/stores';
import { useStores } from '@/stores';

import { Item } from './item';

type Props = {
  text?: TxKeyPath;
};

export const CurrencyItem = observer(({ text = 'finance.currency' }: Props) => {
  const { finance } = useStores();
  const modal = useModal();

  const onSelect = React.useCallback(
    (option: OptionType) => {
      finance.setCurrency(option.value as CurrencyCode);
      modal.dismiss();
    },
    [finance, modal]
  );

  const currencies = [
    { label: translate('finance.currency_usd'), value: 'USD' },
    { label: translate('finance.currency_mvr'), value: 'MVR' },
  ];

  const selected = currencies.find((c) => c.value === finance.currency);

  return (
    <>
      <Item
        text={text}
        value={selected?.label}
        onPress={modal.present}
        icon={<CurrencyIcon />}
      />
      <Options
        ref={modal.ref}
        options={currencies}
        onSelect={onSelect}
        value={selected?.value}
      />
    </>
  );
});
