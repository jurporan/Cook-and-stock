class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here
    user ||= User.new # guest user (not logged in)
    if user.has_role?(:admin)
      can :manage, :all
    end
    if user.has_role?(:client)
      can :manage, Dish
    end
    if user.has_role?(:manager)
      can :read, Dish
    end
  end
end
