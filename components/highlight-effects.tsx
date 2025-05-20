"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export const HighlightStyles = () => {
  return (
    <style jsx global>{`
      .highlight-section {
        position: relative;
        z-index: 10;
        transition: all 0.3s ease-out;
      }
      
      .highlight-section::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(59, 130, 246, 0.1);
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease-out;
      }
      
      .highlight-active {
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.6) !important;
      }
      
      .highlight-active::before {
        opacity: 1;
      }
      
      @keyframes gentlePulse {
        0% { box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.6); }
        50% { box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3); }
        100% { box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.6); }
      }
      
      .highlight-pulse {
        animation: gentlePulse 2s ease-in-out infinite;
      }
    `}</style>
  )
}

export function useHighlightEffect() {
  const searchParams = useSearchParams()
  const highlightParam = searchParams.get('highlight')
  const [isMounted, setIsMounted] = useState(false)
  
  // Handle component mounting
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])
  
  useEffect(() => {
    // Only run the effect if the component is mounted and we have a highlight param
    if (!isMounted || !highlightParam) return
    
    // Split the comma-separated list of subsections
    const highlightSections = highlightParam.split(',')
    
    // Use a longer delay to ensure the page is fully rendered and page transitions are complete
    const initialDelay = 600
    
    const highlightTimer = setTimeout(() => {
      // First add the base class to all elements without animation
      highlightSections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          element.classList.add('highlight-section')
        }
      })
      
      // Additional delay before applying active class
      setTimeout(() => {
        highlightSections.forEach(section => {
          const element = document.getElementById(section)
          if (element) {
            // Scroll to the first element
            if (section === highlightSections[0]) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
            
            // Add highlight effect classes in sequence
            element.classList.add('highlight-active')
            
            // Add pulse effect after a short delay
            setTimeout(() => {
              element.classList.add('highlight-pulse')
            }, 300)
            
            // Remove highlight after 6 seconds
            setTimeout(() => {
              element.classList.remove('highlight-pulse')
              
              // Fade out the highlight
              setTimeout(() => {
                element.classList.remove('highlight-active')
                
                // Clean up the base class after transitions complete
                setTimeout(() => {
                  element.classList.remove('highlight-section')
                }, 300)
              }, 300)
            }, 6000)
          }
        })
      }, 100)
    }, initialDelay)
    
    return () => {
      clearTimeout(highlightTimer)
    }
  }, [highlightParam, isMounted])
  
  return <HighlightStyles />
}

export default useHighlightEffect 