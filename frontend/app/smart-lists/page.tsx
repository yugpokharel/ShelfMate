'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/navigation/Navigation'
import Footer from '@/components/sections/Footer'
import { Plus, Trash2, Edit, Brain, Check } from 'lucide-react'

interface SmartList {
  id: string
  name: string
  items: number
  lastUpdated: string
  suggestions: string[]
  createdAt: string
}

// Mock data
const mockLists: SmartList[] = [
  {
    id: '1',
    name: 'Weekly Essentials',
    items: 12,
    lastUpdated: 'Today',
    suggestions: ['Milk', 'Eggs', 'Bread', 'Chicken'],
    createdAt: '2024-12-01',
  },
  {
    id: '2',
    name: 'Breakfast Items',
    items: 8,
    lastUpdated: 'Yesterday',
    suggestions: ['Oatmeal', 'Yogurt', 'Berries'],
    createdAt: '2024-11-15',
  },
]

export default function SmartListsPage() {
  const [lists, setLists] = useState<SmartList[]>(mockLists)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [selectedList, setSelectedList] = useState<SmartList | null>(null)

  const handleCreateList = () => {
    if (newListName.trim()) {
      const newList: SmartList = {
        id: Date.now().toString(),
        name: newListName,
        items: 0,
        lastUpdated: 'Now',
        suggestions: [],
        createdAt: new Date().toISOString(),
      }
      setLists([...lists, newList])
      setNewListName('')
      setShowCreateForm(false)
    }
  }

  const handleDeleteList = (id: string) => {
    setLists(lists.filter((list) => list.id !== id))
    if (selectedList?.id === id) {
      setSelectedList(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation cartCount={0} />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-card border-b border-border py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Smart Lists</h1>
            <p className="text-muted-foreground">
              AI-powered lists that learn your shopping preferences
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          {/* Create List Section */}
          <div className="mb-12">
            {!showCreateForm ? (
              <button
                onClick={() => setShowCreateForm(true)}
                className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                <Plus className="w-5 h-5" />
                Create New List
              </button>
            ) : (
              <div className="bg-card border border-border rounded-lg p-6 mb-8">
                <h3 className="text-lg font-bold mb-4">Create Smart List</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreateList()}
                    placeholder="Enter list name (e.g., Weekly Groceries)"
                    className="flex-1 px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    autoFocus
                  />
                  <button
                    onClick={handleCreateList}
                    className="bg-accent text-accent-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="px-6 py-2 border-2 border-border rounded-lg hover:bg-secondary transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lists Sidebar */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-bold mb-4">Your Lists</h2>
              <div className="space-y-3">
                {lists.map((list) => (
                  <button
                    key={list.id}
                    onClick={() => setSelectedList(list)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition border-l-4 ${
                      selectedList?.id === list.id
                        ? 'bg-accent text-accent-foreground border-accent-foreground'
                        : 'border-border hover:bg-secondary'
                    }`}
                  >
                    <p className="font-semibold text-sm">{list.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {list.items} items • Updated {list.lastUpdated}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* List Details */}
            <div className="lg:col-span-2">
              {selectedList ? (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-3xl font-bold">{selectedList.name}</h2>
                      <p className="text-muted-foreground mt-1">
                        {selectedList.items} items • Created {selectedList.createdAt}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-secondary rounded-lg transition">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteList(selectedList.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition text-destructive"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* AI Suggestions */}
                  <div className="bg-card border border-accent/20 rounded-lg p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-accent" />
                      AI Suggestions
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Based on your shopping history and preferences
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedList.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          className="flex items-center gap-2 p-3 bg-secondary hover:bg-secondary/80 rounded-lg transition text-left group"
                        >
                          <Plus className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition" />
                          <span className="text-sm">{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Current Items */}
                  <div>
                    <h3 className="font-bold mb-4">Items</h3>
                    <div className="space-y-2">
                      {Array.from({ length: selectedList.items }).map((_, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:shadow-md transition"
                        >
                          <button className="p-1 hover:bg-secondary rounded transition">
                            <Check className="w-5 h-5 text-accent" />
                          </button>
                          <span>Item {idx + 1}</span>
                          <button className="ml-auto p-1 hover:bg-destructive/10 rounded transition text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Item */}
                    <div className="mt-4 flex gap-2">
                      <input
                        type="text"
                        placeholder="Add item to list..."
                        className="flex-1 px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                      />
                      <button className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition">
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      href="/shop"
                      className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-center hover:opacity-90 transition"
                    >
                      Shop From This List
                    </Link>
                    <button className="flex-1 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-secondary transition">
                      Share List
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">No list selected</h3>
                  <p className="text-muted-foreground">
                    Select a list or create a new one to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
