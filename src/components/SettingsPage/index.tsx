import React, { useEffect, useState } from 'react';
import { SettingsType } from '../../types/settings';
import { Button, Input, Spin, Typography } from 'antd';
import { SettingsWrapper } from './styles';
import { CalendarOutlined, GiftOutlined } from '@ant-design/icons';

type SettingsPageProps = {
  config: SettingsType;
  loading: boolean;
  onSetConfig: (fields: SettingsType) => void;
};

export const SettingsPage: React.FC<SettingsPageProps> = ({ config, loading, onSetConfig }) => {
  const [stateConfig, setStateConfig] = useState<SettingsType>(config);
  const [errors, setError] = useState<Record<keyof SettingsType, boolean>>({
    GETTING_PERCENT_BONUSES: false,
    GIFT_BONUSES_USER_BIRTHDAY: false,
    LIMITED_BONUSES_TIMEOUT_DAYS: false,
    MAX_BONUSES_PER_PURCHASE_PERCENT: false,
  });

  const handleChange = (name: keyof typeof stateConfig) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setError((prev) => ({ ...prev, [name]: false }));
    setStateConfig((prev) => ({ ...prev, [name]: Number(e?.target?.value) }));
  };

  const onSubmit = () => {
    if (!stateConfig.GETTING_PERCENT_BONUSES) return setError((prev) => ({ ...prev, GETTING_PERCENT_BONUSES: true }));
    if (!stateConfig.GIFT_BONUSES_USER_BIRTHDAY)
      return setError((prev) => ({ ...prev, GIFT_BONUSES_USER_BIRTHDAY: true }));
    if (!stateConfig.LIMITED_BONUSES_TIMEOUT_DAYS)
      return setError((prev) => ({ ...prev, LIMITED_BONUSES_TIMEOUT_DAYS: true }));
    if (!stateConfig.MAX_BONUSES_PER_PURCHASE_PERCENT)
      return setError((prev) => ({ ...prev, MAX_BONUSES_PER_PURCHASE_PERCENT: true }));
    onSetConfig(stateConfig);
  };

  useEffect(() => {
    setStateConfig(config);
  }, [
    config,
    config.GETTING_PERCENT_BONUSES,
    config.GIFT_BONUSES_USER_BIRTHDAY,
    config.LIMITED_BONUSES_TIMEOUT_DAYS,
    config.MAX_BONUSES_PER_PURCHASE_PERCENT,
  ]);

  return (
    <>
      <Spin spinning={loading} fullscreen />
      <SettingsWrapper>
        <Typography>Получает % от покупки в виде бонусов:</Typography>
        <Input
          addonAfter={<span>%</span>}
          status={errors.GETTING_PERCENT_BONUSES ? 'error' : ''}
          name={'GETTING_PERCENT_BONUSES'}
          value={stateConfig.GETTING_PERCENT_BONUSES}
          placeholder="Enter how much user get bonuses from purchase"
          variant="outlined"
          type="number"
          onChange={handleChange('GETTING_PERCENT_BONUSES')}
        />
        <Typography>Дарим на день рождение</Typography>
        <Input
          addonAfter={<GiftOutlined />}
          status={errors.GIFT_BONUSES_USER_BIRTHDAY ? 'error' : ''}
          name={'GIFT_BONUSES_USER_BIRTHDAY'}
          value={stateConfig.GIFT_BONUSES_USER_BIRTHDAY}
          placeholder="Enter how much user will get bonuses on birthday"
          variant="outlined"
          type="number"
          onChange={handleChange('GIFT_BONUSES_USER_BIRTHDAY')}
        />
        <Typography>Какой макс. процент от суммы можно использовать в виде бонусов</Typography>
        <Input
          addonAfter={<GiftOutlined />}
          status={errors.MAX_BONUSES_PER_PURCHASE_PERCENT ? 'error' : ''}
          name={'MAX_BONUSES_PER_PURCHASE_PERCENT'}
          value={stateConfig.MAX_BONUSES_PER_PURCHASE_PERCENT}
          placeholder="Enter how much percent from price can be used as bonuses for purchase"
          variant="outlined"
          type="number"
          onChange={handleChange('MAX_BONUSES_PER_PURCHASE_PERCENT')}
        />
        <Typography>Сколько дней можно использовать подаренные бонусы</Typography>
        <Input
          addonAfter={<CalendarOutlined />}
          status={errors.LIMITED_BONUSES_TIMEOUT_DAYS ? 'error' : ''}
          name={'LIMITED_BONUSES_TIMEOUT_DAYS'}
          value={stateConfig.LIMITED_BONUSES_TIMEOUT_DAYS}
          placeholder="Enter how much days gifted bonuses will be active"
          variant="outlined"
          type="number"
          onChange={handleChange('LIMITED_BONUSES_TIMEOUT_DAYS')}
        />
        <Button type="primary" onClick={onSubmit}>
          Save
        </Button>
      </SettingsWrapper>
    </>
  );
};
