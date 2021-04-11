import React, { useState, useCallback, useMemo } from 'react';
import { Container } from './styles';

interface IItemWithRemoveButton {
  handleRemovePcForTransfer: () => void;
  value: string;
}

const ItemWithRemoveButton: React.FC<IItemWithRemoveButton> = ({
  handleRemovePcForTransfer,
  value,
}) => {
  return (
    <Container>
      <button type="button" onClick={handleRemovePcForTransfer}>
        X
      </button>
      <span>{value}</span>
    </Container>
  );
};

export default ItemWithRemoveButton;
