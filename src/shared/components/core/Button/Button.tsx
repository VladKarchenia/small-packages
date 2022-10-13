import * as React from "react";

import { ComponentProps } from "@/utils/types";

import { IconDots } from "@/shared/icons";

import { Copy, ICopyProps } from "@/shared/components";

import { SButton, SButtonIcon, SButtonSpinner } from "./Button.styles";

export interface IButtonProps extends ComponentProps<typeof SButton> {
  icon?: JSX.Element;

  id?: string;
  className?: string;

  href?: string;
  target?: string;
  type?: "button" | "submit";

  ariaLabel?: string;
  dataTestid?: string;
  dataTrackId?: string;
  dataTrackValue?: string;

  disabled?: boolean;
  floatingIcon?: boolean;
  noWrap?: boolean;
  shouldPreventDefault?: boolean;

  copyProps?: ICopyProps;

  onBlur?: (e: React.SyntheticEvent) => void;
  onFocus?: (e: React.SyntheticEvent) => void;
  onClick?: (e: React.SyntheticEvent) => void;
}

interface ButtonElementProps extends Partial<IButtonProps> {
  "aria-label"?: string;
  "data-track-id"?: string;
  "data-track-value"?: string;
  "data-testid"?: string;
  rel?: string;
}

export function Button({
  children,
  icon,
  floatingIcon,
  noWrap,
  shouldPreventDefault,
  ariaLabel,
  dataTrackId,
  dataTrackValue,
  dataTestid,
  onClick,
  copyProps,
  ...props
}: IButtonProps) {
  const isLink = props.as === "a";

  const buttonProps = React.useMemo(() => {
    const commonButtonProps: ButtonElementProps = {
      "aria-label": ariaLabel,
      "data-track-id": dataTrackId,
      "data-track-value": dataTrackValue,
      "data-testid": dataTestid,
    };

    if (isLink) {
      return {
        ...commonButtonProps,
        rel: props.target === "_blank" ? "noopener noreferrer" : "",
      };
    } else {
      return {
        ...commonButtonProps,
        type: props.type || "button",
      };
    }
  }, [
    ariaLabel,
    dataTestid,
    dataTrackId,
    dataTrackValue,
    isLink,
    props.target,
    props.type,
  ]);

  const handleClick = React.useCallback(
    (e: React.SyntheticEvent) => {
      if (shouldPreventDefault) {
        e.preventDefault();
      }

      onClick && onClick(e);
    },
    [shouldPreventDefault, onClick]
  );

  return (
    <SButton {...buttonProps} {...props} onClick={handleClick}>
      {props.loading && (
        <SButtonSpinner>
          <IconDots />
        </SButtonSpinner>
      )}
      {!noWrap ? (
        <Copy
          color="system-inherit"
          intent={!props.rounded ? "cta" : "detail"}
          uppercase={!props.rounded}
          bold
          {...copyProps}
        >
          {children}
        </Copy>
      ) : (
        children
      )}
      {icon && <SButtonIcon float={floatingIcon}>{icon}</SButtonIcon>}
    </SButton>
  );
}
