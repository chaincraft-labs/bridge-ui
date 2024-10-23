import TransferTokenCard from "@/components/ui/transfer-token-card";
import TransferTokenStatus from "@/components/ui/transfer-token-status";


export default function Home() {

	return (
		<div className="flex h-screen flex-col items-center md:justify-center md:-mt-16" style={{ height: `calc(100vh - 55px)`}}>
			<div className="max-w-[360px] sm:min-w-[500px] sm:max-w-[500px] md:min-w-[600px] md:max-w-[600px]">
								
				<TransferTokenCard />
				
				<div className="mt-2">
					<TransferTokenStatus />
				</div>
			</div>
		</div>
	)
}
