import { Trans } from "react-i18next"
import { Box, Copy, Pagination, Redacted } from "@/shared/components"

interface ICopies {
  prevLabel: string
  nextLabel: string
  copy: string
  noResults: string
}

export interface IPaginationControlProps {
  limit: number
  offset: number
  total: number
  isLoading: boolean
  copies: ICopies

  onNext: () => void
  onPrevious: () => void
}

export const PaginationControl = ({
  onNext,
  onPrevious,
  limit,
  offset,
  total = 0,
  isLoading,
  copies,
}: IPaginationControlProps) => {
  const start = total === 0 ? 0 : offset + 1
  const end = Math.min(total, offset + limit)

  if (isLoading) {
    return (
      <Pagination
        previous={{
          label: copies.prevLabel,
          disabled: true,
          onClick: onPrevious,
        }}
        next={{
          label: copies.nextLabel,
          disabled: true,
          onClick: onNext,
        }}
      >
        <Box css={{ "@md": { display: "flex", justifyContent: "end", minWidth: "224px" } }}>
          <Redacted height="$24" width="160px" text animated />
        </Box>
      </Pagination>
    )
  }

  return (
    <Pagination
      previous={{
        label: copies.prevLabel,
        disabled: offset === 0 || total < limit,
        onClick: onPrevious,
      }}
      next={{
        label: copies.nextLabel,
        disabled: offset + limit >= total || total < limit,
        onClick: onNext,
      }}
    >
      <Box css={{ "@md": { minWidth: "224px", textAlign: "end" } }}>
        <Copy
          color="neutrals-9"
          scale={{ "@initial": 9, "@md": 8 }}
          dataTestid="pagination"
          data-start={start}
          data-end={end}
          data-total={total}
        >
          {total > 0 ? (
            <Trans
              i18nKey={copies.copy}
              count={total}
              tOptions={{
                start: start,
                end: end,
                total: total,
              }}
              components={[
                <Copy
                  key={1}
                  as="span"
                  color="neutrals-9"
                  scale={{ "@initial": 9, "@md": 8 }}
                  bold
                />,
              ]}
            />
          ) : (
            copies.noResults
          )}
        </Copy>
      </Box>
    </Pagination>
  )
}
