export default function ConnectAccountLoading(){
    return (
        <div className="flex flex-wrap gap-8 justify-center">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex flex-col items-center space-y-2">
              {/* Circle - already centered by items-center */}
              <div className="relative overflow-hidden bg-gray-200 rounded-full h-24 w-24">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
              </div>
              
              {/* Wider text placeholder - centered by parent's items-center */}
              <div className="relative overflow-hidden h-4 bg-gray-200 rounded w-20 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
              </div>
              
              {/* Narrower text placeholder - forced center with mx-auto */}
              <div className="relative overflow-hidden h-3 bg-gray-200 rounded w-16 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
              </div>
            </div>
            ))}
          </div>
    );
}