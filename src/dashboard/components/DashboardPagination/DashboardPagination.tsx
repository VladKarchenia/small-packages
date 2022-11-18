import { useCallback } from "react"
import { useTranslation } from "react-i18next"
import { scrollTo } from "@/utils"
import { PaginationControl } from "@/shared/components"

interface IDashboardPaginationProps {
  scroll?: boolean
  total: number
  limit: number
  offset: number
  loading: boolean
  paginatedTerm: string
  getNext: () => void
  getPrevious: () => void
}

export const DashboardPagination = ({
  total,
  limit,
  offset,
  loading,
  paginatedTerm,
  getNext,
  getPrevious,
  scroll = false,
}: IDashboardPaginationProps) => {
  // TODO: see if we can refactor this mobile scroll behavior referenced in HDASH-351
  const scrollTop = () => {
    window.setTimeout(() => {
      scrollTo({ position: { top: 0, left: 0 } })
    }, 0)
  }

  const handleNextAndScroll = useCallback(() => {
    getNext()
    if (scroll) {
      scrollTop()
    }
  }, [getNext])

  const handlePreviousAndScroll = useCallback(() => {
    getPrevious()
    if (scroll) {
      scrollTop()
    }
  }, [getPrevious])

  const { t } = useTranslation()
  const paginationCopyLabels = {
    prevLabel: t("common:pagination.labels.previous", {
      name: t(`dashboard:paginatedTerms.${paginatedTerm}_plural`),
    }),
    nextLabel: t("common:pagination.labels.next", {
      name: t(`dashboard:paginatedTerms.${paginatedTerm}_plural`),
    }),
    copy: t("common:pagination.count", {
      name: t(`dashboard:paginatedTerms.${paginatedTerm}`, { count: total }),
    }),
    noResults: t("common:pagination.noResultsFound"),
  }

  return (
    <PaginationControl
      limit={limit}
      total={total}
      offset={offset}
      isLoading={loading}
      copies={paginationCopyLabels}
      onNext={handleNextAndScroll}
      onPrevious={handlePreviousAndScroll}
    />
  )
}
