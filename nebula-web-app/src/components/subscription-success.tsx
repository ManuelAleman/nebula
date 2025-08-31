import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApi } from "@/utils/api";
import { apiEndpoints } from "@/utils/apiEndpoints";
import { Loader2 } from "lucide-react";

const SubscriptionSuccess = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { apiPrivate } = useApi();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      apiPrivate.post(apiEndpoints.VERIFY_PAYMENT, { paymentId: sessionId })
        .then(() => {
          navigate("/subscriptions");
        })
        .catch(() => {
          navigate("/subscriptions");
        });
    }
  }, [search]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-blue-500" size={48} />
        <h1 className="text-xl font-semibold text-gray-700">Procesando pago...</h1>
        <p className="text-gray-500 text-center">
          Estamos verificando tu transacción. Esto puede tardar unos segundos.
        </p>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
