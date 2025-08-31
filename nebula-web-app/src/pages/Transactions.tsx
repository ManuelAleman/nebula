import DashboardLayout from "@/layout/DashboardLayout";
import { useApi } from "@/utils/api";
import { apiEndpoints } from "@/utils/apiEndpoints";
import { AlertCircle, Loader2, Receipt } from "lucide-react";
import { useEffect, useState } from "react";

export interface PaymentTransactionDTO {
    id: string;
    clerkId: string;
    orderId: string;
    paymentId: string;
    planId: string;
    amount: number;
    currency: string;
    creditsAdded: number;
    status: string;
    transactionDate: string;
    paymentMethod: string;
    cardLast4: string;
    userEmail: string;
    userName: string;
}


const Transactions = () => {
    const [transactions, setTransactions] = useState<PaymentTransactionDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { apiPrivate } = useApi();

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const response = await apiPrivate.get(apiEndpoints.GET_TRANSACTIONS);
                setTransactions(response.data);
                setError(null);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    }

    return (
        <DashboardLayout activeMenu="Transactions">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <Receipt className="text-blue-600" />
                    <h1 className="text-2xl font-bold">Transactions History</h1>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center">
                        <Loader2 />
                        <span className="ml-2">Loading transactions...</span>
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="bg gray-50 p-8 rounded-lg text-center">
                        <Receipt size={48} className="mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                            No transactions yet
                        </h3>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Plan
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Credits Added
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment ID
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatDate(transaction.transactionDate)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {transaction.planId === "premium"
                                                ? "Premium Plan"
                                                : transaction.planId === "ultimate"
                                                    ? "Ultimate Plan"
                                                    : "Basic Plan"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatAmount(transaction.amount)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {transaction.creditsAdded}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                                            {transaction.paymentId
                                                ? transaction.paymentId.substring(0, 12) + "..."
                                                : "N/A"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Transactions;