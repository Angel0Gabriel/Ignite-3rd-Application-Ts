import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { DateFormatter, PriceFormatter } from '../../utils/formatter'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map(
              ({ category, description, createdAt, id, price, type }) => {
                return (
                  <tr key={id}>
                    <td width="50%">{description}</td>
                    <td>
                      <PriceHighlight variant={type}>
                        {type === 'outcome' ? '- ' : '+ '}
                        {PriceFormatter.format(price)}
                      </PriceHighlight>
                    </td>
                    <td>{category}</td>
                    <td>{DateFormatter.format(new Date(createdAt))}</td>
                  </tr>
                )
              },
            )}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
